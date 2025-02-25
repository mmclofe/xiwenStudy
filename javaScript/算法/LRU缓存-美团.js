// LRU（Least Recently Used，最久未使用）算法是一种常用的缓存淘汰策略，
// 当缓存达到其容量上限时，它会移除那些最久没有被访问的数据项。这种策略基于这样一个假设：
// 如果一个数据项在近期没有被访问过，那么在未来一段时间内也不太可能被访问。
// 实现LRUCache类，并提供put方法和get方法。put方法zai写入缓存，写入缓存之前需判断缓存是否已满，如果已满，需要删除最久未使用的数据项，再写入数据。get方法读取缓存，未读取到缓存，返回-1。
class LRUCache {
  #capacity
  #cache
  constructor(capacity) {
    this.#capacity = capacity;// 缓存的最大容量
    this.#cache = new Map();// 使用 Map 来存储缓存数据
  }
  has(key){
    return this.#cache.has(key)
  }
  get(key) {
    if (this.has(key)) {// 有该key
      // 获取值，并将该 key 移动到 Map 的末尾表示最近使用过
      const value = this.cache.get(key);
      this.#cache.delete(key);
      this.#cache.set(key, value);
      return value;
    } else {
      return -1;
    }
  }
  put(key, value) {
    if(this.has(key)){// 有该key
      // 如果缓存中已经有这个 key，先删除它
      this.#cache.delete(key);
    }else if (this.#cache.size >= this.#capacity) {
      // 如果缓存已满，删除最老的（第一个）元素
      this.#cache.delete(this.#cache.keys().next().value);
    }
    // 插入新的 key-value
    this.#cache.set(key, value);
  }
}