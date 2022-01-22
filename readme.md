# Submission Bookshelf API

Terdapat 5 kriteria utama yang harus Anda penuhi dalam membuat proyek Bookshelf API.

## Kriteria 1 : API dapat menyimpan buku

API yang dibuat harus dapat menyimpan buku melalui route:

- Method : POST
- URL : /books
- Body Request:

```JSON
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

Contoh objek yang disimpan

```JSON
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```

### Server harus merespons gagal bila:

- Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code : 400
  - Response Body:
  ```JSON
  {
      "status": "fail",
      "message": "Gagal menambahkan buku. Mohon isi nama buku"
  }
  ```
- Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code : 400
  - Response Body:
  ```JSON
  {
      "status": "fail",
      "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
  }
  ```
- Server gagal memasukkan buku karena alasan umum (generic error). Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code : 500
  - Response Body:
  ```JSON
  {
      "status": "error",
      "message": "Buku gagal ditambahkan"
  }
  ```
- Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan:
  - Status Code : 201
  - Response Body:
  ```JSON
  {
      "status": "success",
      "message": "Buku berhasil ditambahkan",
      "data": {
          "bookId": "1L7ZtDUFeGs7VlEt"
      }
  }
  ```

## Kriteria 2 : API dapat menampilkan seluruh buku

API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui route:

- Method : GET
- URL : /books

### Server harus mengembalikan respons dengan:

- Status Code : 200
- Response Body:
  `JSON { "status": "success", "data": { "books": [ { "id": "Qbax5Oy7L8WKf74l", "name": "Buku A", "publisher": "Dicoding Indonesia" }, { "id": "1L7ZtDUFeGs7VlEt", "name": "Buku B", "publisher": "Dicoding Indonesia" }, { "id": "K8DZbfI-t3LrY7lD", "name": "Buku C", "publisher": "Dicoding Indonesia" } ] } } `
  Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong.

```JSON
{
    "status": "success",
    "data": {
        "books": []
    }
}
```

## Kriteria 3 : API dapat menampilkan detail buku

API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui route:

- Method : GET
- URL : /books/{bookid}

Bila buku dengan id yang dilampirkan oleh client tidak
ditemukan, maka server harus mengembalikan respons dengan:

- Status Code : 404
- Response Body:

```JSON
{
    "status": "fail",
    "message": "Buku tidak ditemukan"
}
```

Bila buku dengan id yang dilampirkan ditemukan, maka server harus mengembalikan respons dengan:

- Status Code : 200
- Response Body:

```JSON
{
    "status": "success",
    "data": {
        "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
}
```

## Kriteria 4 : API dapat mengubah data buku

API yang dibuat harus dapat menyimpan buku melalui route:

- Method : PUT
- URL : /books/{bookid}
- Body Request:

```JSON
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

### Server harus merespons gagal bila:

- Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code : 400
  - Response Body:
  ```JSON
  {
      "status": "fail",
      "message": "Gagal memperbarui buku. Mohon isi nama buku"
  }
  ```
- Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code : 400
  - Response Body:
  ```JSON
  {
      "status": "fail",
      "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
  }
  ```
- `Id` yang dilampirkan oleh client tidak ditemukkan oleh server. Bila hal ini terjadi, maka server akan merespons dengan:
  - Status Code : 404
  - Response Body:
  ```JSON
  {
      "status": "fail",
      "message": "Gagal memperbarui buku. Id tidak ditemukan"
  }
  ```
- Bila buku berhasil diperbarui, server harus mengembalikan respons dengan:
  - Status Code : 200
  - Response Body:
  ```JSON
  {
      "status": "success",
      "message": "Bila buku berhasil diperbarui, server harus mengembalikan respons dengan"
  }
  ```

## Kriteria 5 : API dapat menghapus buku

API yang Anda buat harus dapat menghapus buku berdasarkan id melalui route berikut:

- Method : DELETE
- URL : /books/{bookid}

Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka server harus mengembalikan respons berikut:

- Status Code : 404
- Response Body:

```JSON
{
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```

Bila id dimiliki oleh salah satu buku, maka buku tersebut harus dihapus dan server mengembalikan respons berikut:

- Status Code : 200
- Response Body:

```JSON
{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```
