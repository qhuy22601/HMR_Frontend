import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { Link } from "react-router-dom";
import Card from "antd"
function AccountItem({ data }) {
  const cx = classNames.bind(styles);
  console.log(data);
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={`/profile/${data.id}`}
      className={cx("info-wrapper")}
    >
      <img className={cx("info-avatar")} src={`${data.image}`} alt="logo" />
      <div className={cx("info-user")}>
        <h4 className={cx("mst")}>
          <span> {`${data.firstName} ${data.lastName}`}</span>
          <br />
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className={cx("name")}>Email:{`${data.email}`}</span>
        </h4>
      </div>
    </Link>
  );
}

export default AccountItem;