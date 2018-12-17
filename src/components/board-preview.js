import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";

import styles from "./article-preview.module.css";

export default ({ board }) => (
  <div className={styles.preview}>
    {board.title}
    {/* <Img alt="" sizes={board.heroImage.sizes} /> */}
    <h3 className={styles.previewTitle}>
      <Link to={`/board/${board.slug}`}>{board.title}</Link>
    </h3>
  </div>
);
