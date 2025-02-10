import React, { useCallback, useState, useRef } from "react";
import axios from "axios";
import "./From.css";
import CursorEffect from "../component/commons/CursorEffect";

import rolling_icon from "../images/logo.svg";
import btn_plus from "../images/From_img/Btn_plus.svg";

/* 텍스트 에디터 */
import TextArea from "../component/TextArea";
import Header from "../component/Header";

/* select 박스 */
import arrowTop from "../images/From_img/arrow_top.svg";
import arrowDown from "../images/From_img/arrow_bottom.svg";
import { useNavigate, useParams } from "react-router-dom";

/* 예시 이미지 */
const ex_img = [
  "https://i.ibb.co/YBLJML7/Frame-2593.png",
  "https://images.pexels.com/photos/10718305/pexels-photo-10718305.jpeg",
  "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7829101/pexels-photo-7829101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1606655/pexels-photo-1606655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/10987077/pexels-photo-10987077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/25916115/pexels-photo-25916115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/15009816/pexels-photo-15009816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/30081152/pexels-photo-30081152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const From = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 값 추출

  /* 이름 */
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(""); // name 에러 상태

  const default_profile = "https://i.ibb.co/YBLJML7/Frame-2593.png";
  const [profileImageURL, setProfileImageURL] = useState(default_profile);

  /* 관계 */
  const [isOpen, setIsOpen] = useState(false);
  const [relationship, setRelationship] = useState("지인");
  const realtion_options = ["친구", "지인", "동료", "가족"];

  /* 내용 */
  const [quillValue, setQuillValue] = useState("");
  const textContainerRef = useRef(null);

  /* 폰트 */
  const [isOpen2, setIsOpen2] = useState(false);
  const [font, setFont] = useState("Noto Sans");
  const font_options = [
    { label: "Noto Sans", value: "Noto Sans" },
    { label: "Pretendard", value: "Pretendard" },
    { label: "나눔명조", value: "NanumMyengjo" },
    { label: "나눔손글씨 손편지체", value: "NanumSonPyeonJiCe" },
  ];

  /* 비밀번호 */
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(""); // pw 에러 상태

  /* 이름 입력 처리 */
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 이름 입력 필드에서 포커스를 잃었을 때 에러 상태 처리
  const handleNameBlur = () => {
    if (!name) {
      setNameError("값을 입력해 주세요!");
    } else {
      setNameError(""); // 값이 있으면 에러 메시지 초기화
    }
  };

  /* 비밀번호 입력 처리 */
  // 숫자만 허용
  const handlePwChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
    if (input.length <= 4) {
      setPw(input); // 4자리 이하만 업데이트
    }
  };

  // 비번 입력 필드에서 포커스를 잃었을 때 에러 상태 처리
  const handlePwBlur = () => {
    if (!pw) {
      setPwError("비밀번호를 입력해주세요!");
    } else {
      setPwError(""); // 값이 있으면 에러 메시지 초기화
    }
  };

  /* 내용 에디터 */
  const handleQuillValue = useCallback((value) => {
    const cleanedHtml = value.replace(/<p><br><\/p>/g, ""); // 줄바꿈 시 자동 생성 태그 없앰
    setQuillValue(cleanedHtml);
  }, []);

  /* 이미지 업로드*/
  const CLOUD_NAME = "dq7m9soc7";
  const UPLOAD_PRESET = "rollingimg";

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("업로드 성공:", data.secure_url);
      setProfileImageURL(data.secure_url); // 업로드된 이미지 URL 저장
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  /* 메시지 생성 API */
  const sendMessage = async () => {
    const url = `https://rolling-api.vercel.app/13-1/recipients/${id}/messages/`;

    const data = {
      team: "13-1",
      recipientId: id,
      sender: name + pw,
      profileImageURL: profileImageURL,
      relationship: relationship,
      content: quillValue,
      font: font,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate(`/post/${id}`);
    } catch (error) {
      console.error(
        "메세지 전송 오류:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <CursorEffect />
      <Header />
      <div className="main">
        <div className="from_main">
          <div className="name">
            <p className="title">From.</p>
            <input
              className={`name_input ${name ? "active" : ""} ${nameError ? "error" : ""}`}
              placeholder="이름을 입력해 주세요."
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur} // 포커스 아웃 시 에러 체크
            />
            {nameError && <p className="name-error_message">{nameError}</p>}{" "}
          </div>
          <div className="profileimg">
            <p className="title">프로필 이미지</p>
            <div className="profile_content">
              <img
                className="default_profile"
                src={profileImageURL}
                alt="프로필 이미지"
              />
              <div className="profile_list">
                <p className="profile_list-p">프로필 이미지를 선택해주세요!</p>
                <div className="profile_list_image">
                  {/* 사용자 지정 이미지 파일 */}
                  <img
                    className="custom_image"
                    src={btn_plus}
                    alt="프로필 이미지"
                    onClick={() => document.getElementById("fileInput").click()} // 클릭 시 파일 선택 input 활성화
                  />

                  {/* 기본 프로필 이미지들 */}
                  {[...Array(9)].map((_, index) => (
                    <img
                      key={index}
                      className="list_image"
                      src={ex_img[index % ex_img.length]}
                      alt={`프로필 이미지 ${index + 1}`}
                      onClick={() =>
                        setProfileImageURL(ex_img[index % ex_img.length])
                      }
                    />
                  ))}
                </div>
                <input // custom_image img에서 활성화
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }} // 파일 선택 input은 화면에 보이지 않게 숨김
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          <div className="relation">
            <p className="title">상대와의 관계</p>
            <div className="selection" onClick={() => setIsOpen(!isOpen)}>
              {relationship}
              <img
                src={isOpen ? arrowTop : arrowDown}
                className="btn_selection"
              />
              {isOpen && (
                <ul className="selection_list">
                  {realtion_options.map((realtion_options, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setRelationship(realtion_options);
                        setIsOpen(false);
                      }}
                    >
                      {realtion_options}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="content">
            <p className="contnetp">내용을 입력해 주세요</p>
            <TextArea
              onQuillValueChange={handleQuillValue}
              textContainerRef={textContainerRef}
            />
          </div>

          <div className="font">
            <p className="title">폰트 선택</p>
            <div className="selection" onClick={() => setIsOpen2(!isOpen2)}>
              <div style={{ fontFamily: font }}>{font}</div>
              <img
                src={isOpen2 ? arrowTop : arrowDown}
                className="btn_selection"
              />
              {isOpen2 && (
                <ul className="selection_list">
                  {font_options.map((font_options, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setFont(font_options.label);
                        setIsOpen2(false);
                      }}
                      style={{ fontFamily: font_options.value }}
                    >
                      {font_options.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="message_pw">
            <p className="title">비밀번호</p>
            <input
              className={`pw_input ${pw ? "active" : ""} ${pwError ? "error" : ""}`}
              placeholder="숫자 4자리를 입력해 주세요."
              value={pw}
              onChange={handlePwChange}
              maxLength={4} // 최대 4자리 제한
              inputMode="numeric"
              onBlur={handlePwBlur} // 포커스 아웃 시 에러 체크
            />
            {pwError && <p className="pw-error_message">{pwError}</p>}{" "}
          </div>

          <div>
            <button
              className="btn_send"
              onClick={sendMessage}
              disabled={!name || !quillValue || pw.length !== 4}
            >
              보내기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default From;
