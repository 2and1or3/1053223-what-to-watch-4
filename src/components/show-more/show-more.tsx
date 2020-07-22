import * as React from "react";

interface Props {
  onMoreClick: () => void;
  hide: boolean;
}

const ShowMore: React.FunctionComponent<Props> = (props: Props) => {
  const {onMoreClick, hide} = props;

  const element = (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onMoreClick}>Show more</button>
    </div>
  );

  return hide ? null : element;
};

export default ShowMore;
