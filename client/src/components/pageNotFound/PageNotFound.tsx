import "./style.scss"
import SVG from "../../assets/svg/errorPage.svg"

const PageNotFound = () => {
  return (
    <div className="pnf">
      <img src={SVG}/>
      <button className="btn-ghost">Back</button>
    </div>
  )
}

export default PageNotFound