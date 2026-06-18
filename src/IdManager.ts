/*     
"dependencies": {
    "uuid": "^11.1.0"
}
 */
//import { v4 as uuidv4 } from "uuid";

export type Id = string | number;

export type IdGenerator = () => Id;

export type ItemWithId = {
  id: Id;
  [key: string]: any;
};

// 1. הגדרה של טיפוס הקלט: אובייקט שיכול להיות עם או בלי 'key'
// נשתמש ב-type alias עם Intersection Type כדי לשלב את T עם מאפיין ה-key האופציונלי.
export type ItemWithOptionalKey<T extends object> = T & {
  key?: string; // הופך את key לאופציונלי בקלט
};

// 2. הגדרה של טיפוס הפלט: אובייקט שחובה שיהיה לו 'key'
export type ItemWithRequiredKey<T extends object> = T & {
  key: string; // הופך את key לחובה בפלט
};

const t: ItemWithId = { 
  id: '4'
  
}


const defaultIdGenerator: IdGenerator = () => 
    Math.random().toString(36).substr(2, 9);

let idGenerator: IdGenerator = defaultIdGenerator;

export const setCustomIdGenerator = (generator?: IdGenerator) => {
  idGenerator = generator || defaultIdGenerator;
};

export const generateId: IdGenerator = (): Id => idGenerator();


export class IdManager {
  private generator: IdGenerator;

  constructor(customGenerator?: IdGenerator) {
    // ברירת מחדל אם לא סופק גנרטור מותאם אישית
    this.generator = customGenerator || defaultIdGenerator;
  }

  // יצירת ID לפי הגנרטור של המופע הספציפי הזה
  public generate(): Id {
    return this.generator();
  }

  // אפשרות להחליף את הגנרטור של המופע הנוכחי בלבד
  public setGenerator(generator: IdGenerator): void {
    this.generator = generator;
  }
}