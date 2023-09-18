// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGo9aPb92fMqIzSwfgzDcSCZj0G1clmsc",
  authDomain: "album-6d914.firebaseapp.com",
  projectId: "album-6d914",
  storageBucket: "album-6d914.appspot.com",
  messagingSenderId: "391931630805",
  appId: "1:391931630805:web:cac08bab0ca4b958ce7e5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//
$("#postingbtn").click(async function () {
  let image = $("#image").val();
  let title = $("#title").val();
  let date = $("#date").val();
  let content = $("#content").val();

  let doc = { image: image, title: title, date: date, content: content };
  await addDoc(collection(db, "album"), doc);
  // 저장하고 페이지 리로드
  window.location.reload();
});

// 추억저장하기 토글
$("#savebtn").click(async function () {
  $(".postingbox").toggle();
});

// 데이터 읽기 - 저장된 데이터 카드에 넣기
let docs = await getDocs(collection(db, "album"));
docs.forEach((doc) => {
  let row = doc.data();
  let image = row["image"];
  let title = row["title"];
  let date = row["date"];
  let content = row["content"];

  let html_temp = `
  <div class="col">
  <div class="card h-100">
    <img
      src="${image}"
      class="card-img-top"
      alt="..." />
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${content}</p>
    </div>
    <div class="card-footer">
      <small class="text-body-secondary">${date}</small>
    </div>
  </div>
</div>`;

  $("#cards").append(html_temp);
});

// 미세먼지 정보 넣기
let url = "http://spartacodingclub.shop/sparta_api/seoulair";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let getData = data["RealtimeCityAir"]["row"][0];
    $(".mise").text(getData["IDEX_NM"]);
  });
