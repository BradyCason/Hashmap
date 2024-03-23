class HashMap{
    constructor(size, loadFactor){
        this.size = size;
        this.table = new Array(size)
        this.loadFactor = loadFactor;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    }

    set(key, value){
        const index = this.hash(key) % this.size;
        const bucket = this.table[index];

        if (bucket){
            const existingItem = bucket.find(item => item[0] === key);
            if (existingItem){
                existingItem[1] = value
            }
            else{
                bucket.push([key,value])
            }
        }
        else{
            this.table[index] = [[key,value]]
        }

        if (this.length() / this.size >= this.loadFactor){
            let oldEntries = this.entries()
            this.clear()
            this.size *= 2;
            oldEntries.forEach(entry => {
                this.set(entry[0], entry[1])
            });
        }
    }

    get(key){
        const index = this.hash(key) % this.size;
        const bucket = this.table[index];

        if (bucket){
            const existingItem = bucket.find(item => item[0] === key);
            if (existingItem){
                return existingItem[1];
            }
            else{
                return null
            }
        }
        else{
            return null
        }
    }

    has(key){
        const index = this.hash(key) % this.size;
        const bucket = this.table[index];

        if (bucket){
            const existingItem = bucket.find(item => item[0] === key);
            if (existingItem){
                return true;
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }

    remove(key){
        const index = this.hash(key) % this.size;
        const bucket = this.table[index];

        if (bucket){
            const existingItem = bucket.find(item => item[0] === key);
            if (existingItem){
                let itemIndex = bucket.indexOf(key)
                bucket.splice(itemIndex, 1);
                return true;
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }

    length(){
        let len = 0;
        for (const bucket in this.table){
            for (const pair in this.table[bucket]){
                len++;
            }
        }
        return len
    }

    clear(){
        for (let i = 0; i < this.size; i++) {
            this.table[i] = [];
        };
    }

    keys(){
        let returnList = []
        for (const bucket in this.table){
            for (const pair in this.table[bucket]){
                returnList.push(this.table[bucket][pair][0])
            }
        }
        return returnList
    }

    values(){
        let returnList = []
        for (const bucket in this.table){
            for (const pair in this.table[bucket]){
                returnList.push(this.table[bucket][pair][1])
            }
        }
        return returnList
    }

    entries(){
        let returnList = []
        for (const bucket in this.table){
            for (const pair in this.table[bucket]){
                returnList.push(this.table[bucket][pair])
            }
        }
        return returnList
    }
}