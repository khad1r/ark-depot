
import { getMaterialsFromImage } from "./getDepotFromImage";

async function importFromImage(fileList) {
    try {
        const result = await getMaterialsFromImage(fileList); // Replace workerAPI call with the actual function

        const payloadArray = [];

        for (let i = 0; i < result.length; i++) {
            const imageResult = result[i];
            for (const itemId in imageResult) {
                if (imageResult[itemId] != null) {
                    payloadArray.push({ itemId: itemId, newQuantity: imageResult[itemId] });
                }
            }
        }

        return {
            success: true,
            errorMessage: "",
            data: payloadArray,
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            errorMessage: "Depot import failed",
            data: [],
        };
    }
}
module.exports = importFromImage