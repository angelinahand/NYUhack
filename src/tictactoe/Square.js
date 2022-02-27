// https://github.com/dejwid/react-tic-tac-toe
import Book from '../images/book.png';
import Pencil from '../images/pencil.png';

function Square(props) {
    return (
      <div className={'square'} {...props}>{props.x ? <img className="squareImg" src={Book} alt="Book"/> : (props.o ? <img className="squareImg" src={Pencil} alt="Pencil"/> : '')}</div>
    );
  }
  
  export default Square;