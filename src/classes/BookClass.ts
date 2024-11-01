//book class

class Book {
  constructor(
    public title: String,
    public author: String,
    public genre: String[],
    public pageNumbers: number
  ) {}

  displayBook(): void {
    let text = `Title: ${this.title}\nAuthor: ${this.author}\nGenre: ${this.genre}\nPage Numbers: ${this.pageNumbers}`;
    console.log(text);
  }
}

export default Book;
