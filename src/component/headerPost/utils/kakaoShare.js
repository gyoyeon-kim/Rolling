export const shareKakao = (backgroundImage, backgroundColor) => {
<<<<<<< HEAD
    if (!window.Kakao) {
      alert("⚠️ 카카오 SDK가 로드되지 않았습니다. 새로고침 후 다시 시도해주세요.");
      return;
    }
  
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
  
    const finalImage = backgroundImage
      ? backgroundImage
      : `https://via.placeholder.com/500/${backgroundColor.replace("#", "")}/FFFFFF?text=%20`;
  
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "따뜻한 마음을 전해보세요",
        description: "추억을 담은 롤링페이퍼로 소중한 사람에게 따뜻한 한마디를 남겨보세요!",
        imageUrl: finalImage,
=======
  if (!window.Kakao) {
    alert(
      "⚠️ 카카오 SDK가 로드되지 않았습니다. 새로고침 후 다시 시도해주세요."
    );
    return;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }

  const finalImage = backgroundImage
    ? backgroundImage
    : `https://via.placeholder.com/500/${backgroundColor.replace("#", "")}/FFFFFF?text=%20`;

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "따뜻한 마음을 전해보세요",
      description:
        "추억을 담은 롤링페이퍼로 소중한 사람에게 따뜻한 한마디를 남겨보세요!",
      imageUrl: finalImage,
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    },
    buttons: [
      {
        title: "💌 마음 전하기 💌",
>>>>>>> upstream/main
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    ],
  });
};
