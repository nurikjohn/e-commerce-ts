import router from "../routes/index"

router.stack.map((rout: any) => {
    rout.handle.stack.map((r: any) => {
        let route = `${new RegExp(rout.regexp).source}${new RegExp(r.regexp).source}`
            .replace("?(?=\\/|$)^\\/", "")
            .replace(/\\\//g, "/")
            .replace(/\?\(\?\=\/\|\$\)|\/\?\$|\^/g, "")
            .replace(/\(\?\:\(\[\/\]\+\?\)\)/g, "$")

        r.keys.map((key: any) => {
            route = route.replace("$", `{${key.name}}`)
        })

        console.log(route)
    })
})
