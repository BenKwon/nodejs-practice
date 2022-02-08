# multer 모듈
> multer는 파일 업로드를 위해 사용되는 multiplart/form-date를 다루기 위한 node.js의 미들웨어이다.  

## 설치
```shell
npm install --save multer
```  
<br>

## 사용법
기본 사용 예제:
```javascript
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file 은 `avatar` 라는 필드의 파일 정보입니다.
  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files 는 `photos` 라는 파일정보를 배열로 가지고 있습니다.
  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files는 (String -> Array) 형태의 객체 입니다.
  // 필드명은 객체의 key에, 파일 정보는 배열로 value에 저장됩니다.
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
})

```


일반적으로 multer를 이용해서 여러 storage(disk, memory, s3)에 저장할 수 있다.  
multer를 이용해서 파일 업로드를 하기 위해서는 storage를 설정하고 filename을 어떻게 할건지 설정해야한다.  
아래 코드와 같이 storage에 대한 설정을 마치면 upload라는 변수에 넣어서 사용한다.  

```js
const upload :  multer({
    storage: storage
});
```
<br>

## Storage 설정
diskStorage를 통해서 storage를 어떻게 활용해야 하는지 알아보자.  
우선 disk에 저장하는 storage를 생성하는 법은 아래와 같다.

```js
const storage = multer.diskStorage({
    destination,
    filename
});
```
### destination
destination을 설정하는 부분이다. destination을 보면 함수다.  

```js
const destination = function (req, file, cb) {
  const { username } = req.body;
  console.log(username)
  const dest = path.join(__dirname,`uploads/${username}`);

  fs.access(dest, constants.F_OK, function (error) {
    if (error) {
      // console.log("Directory does not exist.");
      return fs.mkdir(dest, (error) => {console.log(error)});
    } else {
      // console.log("Directory exists.");
      return cb(null, dest);
    }
  });
  // cb(null, dir);
};

const filename = function (req, file, cb) {
  const { username } = req.body;
  const dest = path.join(__dirname,`uploads/${username}`,file.originalname);
  console.log(dest)
  fs.access(dest, constants.F_OK, (error)=>{
      if(error){
        return cb(null, file.originalname);
      }
      const filename = newFileNameForDup(file.originalname);
      cb(null, filename);
  })
}
```
공식 문서를 보면 
```
Each function gets passed both the request (req) and some information about the file (file) to aid with the decision.

Note that req.body might not have been fully populated yet. It depends on the order that the client transmits fields and files to the server
```
라고 되어있다. 즉 destination과 filename에서 request에서 업로드할 파일에 대한 정보를 받는다고 한다.  
하지만 req.body가 전부 받아오지는 않을 수 있고 한다. 그래서 클라이언트에서 파일을 보낼 때 파일 업로드에 관련해서 사용되는 세팅 값을 같이 body에 담아와서 쓰고 싶으면 파일보다 앞에 놓고 보내야한다.  

**index.html**
```html
<form action="/upload" method="post" enctype="multipart/form-data">
                Select image to upload:
                <input type="text" name="username" id="username" placeholder="username">
                <input type="file" name="fileToUpload" multiple id="fileToUpload">
                <input type="submit" value="Upload Image" name="submit">
</form>
```
위 html을 보면 username input태그가 file input 태그보다 앞에 위치한다.  
이렇게 하면 username을 destination의 req에서 가지고 있다. 

<br>

## multer 파일 업로드 에러 핸들링
공식 문서에 있는 에러 핸들링 예제를 참고하여 만들어봤다.  
post의 argument로 들어가있던 upload()가 아예 post의 미들웨어 함수로 들어왔다. 
upload.array()자체가 미들웨어이므로 미들웨어 확장법을 이용하여 처리할 수 있다.  
```js
//file upload
//post의 ar
app.post('/upload', (req, res) => {
    upload.array('fileToUpload')(req,res,(err)=>{
      if(err){
        console.log(err);
        return console.log("upload router error");  
      }
      // console.log(req.files);
    });
});

```
