/** IndexError: raised when index not found. */

class IndexError extends Error {
}

/**
 * NodeStr: node for a singly-linked list of string.
 *
 * - val
 * - next: next NodeStr or null
 */

class NodeStr {
  val: string;
  next: NodeStr | null;

  constructor(val: string) {
    this.val = val;
    this.next = null;
  }
}

/**
 * Linked list of numbers.
 */

class LLStr {
  head: NodeStr | null;
  tail: NodeStr | null;
  length: number;

  constructor(vals: string[] = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (const val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val: string): void {
    const newNode: NodeStr = new NodeStr(val);
    if (this.head === null) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val: string): void {
    const newNode: NodeStr = new NodeStr(val);
    newNode.next = this.head;
    this.head = newNode;
    if(this.tail === null) this.tail = this.head;
    this.length += 1;
  }

  /** pop(): return & remove last item.
   *
   * Throws IndexError on empty list.
   **/

  pop(): string {

    if (this.head === null){
      throw new IndexError("no item in the list")
    }

    let val = ""

    if (this.length === 1){
      val = this.head.val
      this.head = null
      this.tail = null
      this.length = 0
    }

    let current: NodeStr | null = this.head

    while (current !== null){
      if (current.next === this.tail && this.tail !== null){
        this.length -= 1
        val = this.tail.val
        this.tail = current
        current.next = null
      }
      current = current.next
    }

    return val
  }

  /** shift(): return & remove first item.
   *
   * Throws IndexError on empty list.
   **/

  shift(): string {

    if (this.head === null){
      throw new IndexError("Array is empty")
    }

    let val = this.head.val
    this.length -= 1
    this.head = this.head.next

    if (this.length === 0){
      this.tail = null
    }

    return val;
  }

  /** getAt(idx): get val at idx.
   *
   * Throws IndexError if not found.
   **/

  getAt(idx: number): string {

    if (this.head === null || idx >= this.length || idx < 0){
      throw new IndexError()
    }

    let currentIdx = 0
    let currentNode = this.head

    while (idx > currentIdx){
      if (currentNode.next !==null){
        currentNode = currentNode.next
      }
      currentIdx++
    }
    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val.
   *
   * Throws IndexError if not found.
   **/

  setAt(idx: number, val: string): void {

    if (this.head === null || idx < 0 || idx >= this.length){
      throw new IndexError()
    }

    let currentIdx = 0
    let currentNode = this.head
    let previousNode = null

    while (currentIdx < idx){
      if (currentNode.next !== null){
        previousNode = currentNode
        currentNode = currentNode.next
      }
      currentIdx++
    }

    currentNode.val = val

  }

  /** insertAt(idx, val): add node w/val before idx.
   *
   * Throws IndexError if not found.
   **/

  insertAt(idx: number, val: string): void {

    if (idx < 0 || idx > this.length){
      throw new IndexError()
    }

    let newNode = new NodeStr(val)

    if (this.head === null){
      this.head = newNode
      this.tail = newNode
      this.length = 1
      return
    }

    if (this.length === 1){
      this.head = newNode
      this.length = 2
    }

      let currentIdx = 0
      let currentNode = this.head
      let previousNode = null

      while (currentIdx < idx){
        previousNode = currentNode
        if (currentNode.next !== null){
          currentNode = currentNode.next
        }
        currentIdx++
      }

      if (previousNode === null){
        this.head = newNode
      } else if (previousNode === currentNode){
        this.tail = newNode
      } else {
        previousNode.next = newNode
      }

      newNode.next = currentNode
      this.length ++
  }

  /** removeAt(idx): return & remove item at idx,
   *
   * Throws IndexError if not found.
   **/

  removeAt(idx: number): string {

    // idx not valid
    // only one element
    // regular cases
    // start at the head, continue operation until we reach idx
    // take the element return it
    // previous element's next needs to link to the one after
    // if removing at beginning (update the head) vs. at the end (update the tail)

    if (idx < 0 || idx >= this.length){
      throw new IndexError()
    }

    let node = null

    if (this.length === 1){
      node = this.head
      this.head = null
      this.tail = null
      this.length = 0
    }

    if (idx === 0){
      node = this.head
      this.head = this.head!.next
    }

    let currentIdx = 0
    let currentNode = this.head
    let previousNode = null

    while (currentIdx < idx){
      previousNode = currentNode
      currentNode = currentNode!.next
      currentIdx++
    }

    previousNode.next = currentNode

    if (idx === this.length-1){
      node = this.tail
    }

    return node.val;
  }

  /** toArray (useful for tests!) */

  toArray(): string[] {
    const out = [];
    let current = this.head;

    while (current) {
      out.push(current.val);
      current = current.next;
    }

    return out;
  }
}


export {
  IndexError,
  LLStr,
  NodeStr,
};