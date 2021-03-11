import { baseURL } from "./useAxios";

export function makeImage(imageId: string) : any {
    return `${baseURL}/image/${imageId}`;
}
