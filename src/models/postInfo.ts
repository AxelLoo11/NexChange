export class PostInfo {
    id: string;
    title: string;
    imageUrl: string;
    author: string;
  
    constructor(id: string, title: string, imageUrl: string, author: string) {
      this.id = id;
      this.title = title;
      this.imageUrl = imageUrl;
      this.author = author;
    }
  }
  