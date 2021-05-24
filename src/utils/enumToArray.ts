export default (_enum: any) => {
    return Object.keys(_enum).filter((k) => typeof _enum[k] === "number")
}
