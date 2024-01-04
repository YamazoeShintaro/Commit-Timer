import Image from "next/image";
import TriviaImage from "@/image/trivia.png";

export default function Trivia({ triviaNum }) {
    const triviaBox = [
        "アブラカタブラの意味は『花粉症退治』",
        "六つ葉のクローバーに秘められた幸運は『地位・名声』",
        "ガリガリくんの当たりの確率は『3％』",
        "通話中に電話から聴こえる声は『声が似ている別人の声』",
        "「テンパる」の本来の意味は『準備が整う』",
        "「ヨッシー」の本名は『T.ヨシザウルス・ムンチャクッパス』",
        "じゃんけんで勝率を上げる方法は『「最初はグー！じゃんけんポン！」を強く言ってパーを出す』",
        "イギリスの面白い法律『妊婦はどこで用を足しても大丈夫』",
        "イギリスの面白い法律『バーで酔っ払ってはいけない』",
        "イギリスの面白い法律『切手の王または女王の肖像を逆さまに貼り付けてはいけない』",
    ];

    return (
        <div className="relative">
            <div className="absolute left-3.5 -top-5"><Image src={TriviaImage} alt="" width={40} height={40}/></div>
            <p className="border-2 rounded-md text-lg mb-6 mx-8 px-2 py-2 max-w-lg flex justify-center">{triviaBox[triviaNum]}</p>
        </div>
    );
}

