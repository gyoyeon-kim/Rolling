import React from "react";
import { useParams } from "react-router-dom";

function PostPageBH() {
  const { id } = useParams();

  return (
    <div>
      <h1>롤링페이퍼 생성 페이지</h1>
      <p>이 페이지는 ID {id}의 롤링페이퍼를 나타냅니다.</p>
    </div>
  );
}

export default PostPageBH;
