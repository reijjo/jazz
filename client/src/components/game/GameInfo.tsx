import info from "../../assets/images/icons/icons8-info-50.png";

import { GameCategories } from "../../utils/types";
import { getInfoFields } from "../../utils/helpers";

type Props = {
  category: GameCategories;
  handleHover: (header: string, children: string) => void;
  handleMouseLeave: () => void;
};

const GameInfo = ({ category, handleHover, handleMouseLeave }: Props) => {
  const { header, children } = getInfoFields(category);

  const isOnes = category === GameCategories.Ones;
  const isPair = category === GameCategories.Pair;

  return (
    <div className="game-ohje">
      <div className="game-ohje-div">
        <div>
          {isOnes ? GameCategories.Ones : isPair ? GameCategories.Pair : null}
        </div>
        <img
          src={info}
          alt="info"
          height="50%"
          onMouseEnter={() => handleHover(header, children)}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default GameInfo;
