export function deleteEmpty(obj: any): any {
    if (typeof obj !== 'object') {
        return obj
    }
    if (Array.isArray(obj)) {
        if(obj.length === 0) return
        return obj.filter(item => {
            if (typeof item === 'object') {
                return Object.keys(item).length > 0
            } else {
                return item !== null && item !== undefined
            }
        })
    } else {
        const newObj: any = {}
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    newObj[key] = deleteEmpty(obj[key])
                } else {
                    if (Object.keys(obj[key]).length > 0) {
                        newObj[key] = deleteEmpty(obj[key])
                    }
                }
            } else {
                if (obj[key] !== null && obj[key] !== undefined) {
                    newObj[key] = obj[key]
                }
            }
        })
        return newObj
    }
}
