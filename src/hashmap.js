import { Node, LinkedList } from "./linked-lists.js";

export class HashMap {
    constructor(capacity) {
        if (!capacity) { capacity = 8; }
        this.loadFactor = 0.8;
        this.buckets = Array(capacity);
        this.capacity = capacity;
        for (let i = 0; i < this.capacity; i++) {
            this.buckets[i] = new LinkedList();
        }
    }

    hash(move, current) {
        let hashCode = [0, 0];
        hashCode[0] = move[0] - current[0];
        hashCode[1] = move[1] - current[1];
        hashCode = hashCode.toString();
        switch (hashCode) {
            case ("-2,-1"): //2down, 1left
                hashCode = 0;
                break;
            case ("-2,1"): //2down, 1right
                hashCode = 1;
                break;
            case ("1,-2"): //2left, 1down
                hashCode = 2;
                break;
            case ("-1,-2"): //2left, 1up
                hashCode = 3;
                break;
            case ("2,-1"): //2up, 1left
                hashCode = 4;
                break;
            case ("2,1"): //2up, 1right
                hashCode = 5;
                break;
            case ("-1,2"): //2right, 1up
                hashCode = 6;
                break;
            case ("1,2"): //2right, 1down
                hashCode = 7;
                break;
        }
        return hashCode;
    }

    set(move, current) {
        // this.growIfNeeded();
        const bucketIndex = this.hash(move, current);
        const bucket = this.buckets[bucketIndex];
        try {
            const keyIndex = bucket.findKey(move);
            bucket.at(keyIndex).key = move;
            bucket.at(keyIndex).value = move;
        } catch { bucket.append(move, move); }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        try {
            return bucket.at(bucket.findKey(key)).value;
        } catch { return null; }
    }

    has(key) {
        const index = this.hash(key);
        return this.buckets[index].containsKey(key);
    }

    remove(key) {
        const bucketIndex = this.hash(key);
        const bucket = this.buckets[bucketIndex];
        const keyIndex = bucket.findKey(key);
        if (keyIndex != null) {
            bucket.removeAt(keyIndex);
            return true;
        }
        else { return false; }
    }

    length() {
        let count = 0;
        this.buckets.forEach((bucket) => {
            count += bucket.size();
        })
        return count;
    }

    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = new LinkedList();
        }
    }

    keys() {
        let keys = [];
        this.buckets.forEach((bucket) => {
            if (bucket.head != null) {
                for (let i = 0; i < bucket.size(); i++) {
                    keys.push(bucket.at(i).key);
                }
            }
        })
        return keys;
    }

    values() {
        let values = [];
        this.buckets.forEach((bucket) => {
            for (let i = 0; i < bucket.size(); i++) {
                values.push(bucket.at(i).value);
            }
        })
        return values;
    }

    entries() {
        let allEntries = [];
        this.buckets.forEach((bucket) => {
            if (bucket.head != null) {
                for (let i = 0; i < bucket.size(); i++) {
                    let entry = [];
                    entry.push(bucket.at(i).key);
                    entry.push(bucket.at(i).value);
                    allEntries.push(entry);
                }
            }
        })
        return allEntries;
    }

    growIfNeeded() {
        if (this.needForGrowth()) {
            const oldEntries = this.entries();
            this.resizeBuckets();
            this.reHashAndSet(oldEntries);
        }
    }

    needForGrowth() {
        const numberOfStoredKeys = this.keys().length;
        return numberOfStoredKeys / this.capacity >= this.loadFactor;
    }

    resizeBuckets() {
        const newCapacity = this.capacity * 2;
        this.capacity = newCapacity;
        this.buckets = Array(newCapacity);
        for (let i = 0; i < newCapacity; i++) {
            this.buckets[i] = new LinkedList();
        }
    }

    reHashAndSet(entries) {
        entries.forEach((entry) => {
            this.set(entry[0], entry[1]);
        });
    }

}
