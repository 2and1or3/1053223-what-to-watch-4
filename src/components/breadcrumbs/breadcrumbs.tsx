import * as React from "react";

interface Props {
  title: string;
}

const BreadCrumbs: React.FunctionComponent<Props> = (props: Props) => {
  const {title} = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="movie-page.html" className="breadcrumbs__link">{title}</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
