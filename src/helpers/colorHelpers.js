import js from "../assets/languages/js.png";
import cSharp from "../assets/languages/c-sharp.png";
import go from "../assets/languages/go.png";
import java from "../assets/languages/java.png";
import php from "../assets/languages/php.png";
import py from "../assets/languages/py.png";
import ruby from "../assets/languages/ruby.png";
import ts from "../assets/languages/typescript.png";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getRandomColorPairs = (count) => {
  const imagePathList = [js, cSharp, go, java, php, py, ruby, ts];
  const imageList = [];

  for (let i = 0; i < count; i++) {
    const imagePath = imagePathList[i % imagePathList.length];
    imageList.push(imagePath);
  }

  const fullImageList = [...imageList, ...imageList];
  shuffle(fullImageList);

  return fullImageList;
};
