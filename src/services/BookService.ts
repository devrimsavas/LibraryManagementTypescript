import Book from "../models/BookModel";
import Library from "../models/LibraryModel";
import { Op, Sequelize } from "sequelize";

interface bookDataInterface {
  id: number;
  title: string;
  author: string;
  genre: string;
  pageNumbers: number;
  genreName: string;
}

class BookService {
  private Book: any;
  private sequelize: Sequelize;
  private Library: any;
  private Genre: any;

  constructor(db: any) {
    this.sequelize = db.sequelize;
    this.Book = db.Book;
    this.Library = db.Library;
  }

  //create a new book
  async createBook(bookData: bookDataInterface) {
    try {
      const newBook = await this.Book.create(bookData);
      return newBook;
    } catch (error: any) {
      throw new Error(`Error creating new book  ${error.message}`);
    }
  }

  //create a new book with category
  /*
  async createBookWithCategory(bookData: bookDataInterface) {
    const { title, author, genreName, pageNumbers } = bookData;
    //ensure genre exists, or create it if it does not exists
    let genre;
    try {
        // write first genre serviegenre=await this.
    }
  }
    */

  //find a book by name
  async findBookByTitle(title: bookDataInterface) {
    try {
      const book = await this.Book.findOne({ where: { title } });
      return book;
    } catch (error: any) {
      throw new Error(`Error finding Book ${error.message}`);
    }
  }

  //find book byId

  async findBookById(bookId: number) {
    try {
      const book = await this.Book.findByPk(bookId);
      return book;
    } catch (error: any) {
      throw new Error(`Error finding Book ${error.message}`);
    }
  }

  //find all books
  async findAllBooks() {
    try {
      const books = await this.Book.findAll();
      return books;
    } catch (error: any) {
      throw new Error(`Error finding Books ${error.message}`);
    }
  }

  //delete book by Id

  async deleteBook(bookId: number) {
    try {
      const book = await this.Book.findByPk(bookId);
      if (!book) {
        throw new Error("book not found");
      }
      await book.destroy();
      return true;
    } catch (error: any) {
      throw new Error(`error deleting book ${error.message}`);
    }
  }
}

export default BookService;
