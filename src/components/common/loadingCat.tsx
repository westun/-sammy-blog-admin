import CatLickingPawImg from "../../assets/images/cat_licking_paw.gif";

export default function LoadingCat() {
  return (
    <div className="text-center mt-5">
      <img src={CatLickingPawImg} style={{ width: "128px", height: "104px" }} />
      <h3>Loading...</h3>
    </div>
  );
}
