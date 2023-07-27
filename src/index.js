import DepotRecognitionWorker from 'comlink-loader!@arkntools/depot-recognition/worker';
import { isTrustedResult, toSimpleTrustedResult } from '@arkntools/depot-recognition/tools';
import { transfer } from 'comlink';
import { sortBy } from 'lodash';

// You can implement your own caching logic
const getResources = async () => {
    const fetchJSON = url => fetch(url).then(r => r.json());

    const { mapMd5 } = await fetchJSON('https://data-cf.arkntools.app/check.json');
    const fileMap = await fetchJSON(`https://data-cf.arkntools.app/map.${mapMd5}.json`);

    const item = await fetchJSON(`https://data-cf.arkntools.app/data/item.${fileMap['data/item.json']}.json`);
    const pkg = await fetch(`https://data-cf.arkntools.app/pkg/item.${fileMap['pkg/item.zip']}.zip`).then(r =>
        r.arrayBuffer()
    );

    const getSortId = id => item[id].sortId.cn; // cn us jp kr
    const order = sortBy(Object.keys(item).filter(getSortId), getSortId);

    return { order, pkg };
};

const initRecognizer = async () => {
    const { order, pkg } = await getResources();
    const worker = new DepotRecognitionWorker();
    return await new worker.DeportRecognizer(transfer({ order, pkg }, [pkg]));
};

(async () => {
    const dr = await initRecognizer();
    const { data } = await dr.recognize(
        'https://github.com/arkntools/depot-recognition/raw/main/test/cases/cn_iphone12_0/image.png' // can be blob url
    );
    console.log(data.filter(isTrustedResult)); // full trust result
    console.log(toSimpleTrustedResult(data)); // simple trust result
})();