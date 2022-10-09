const PersonForm = ({ nameValue, numberValue, onChange, onClick }) => {
  return (
    <form>
      <div>
        name: <input name="nameInput" value={nameValue} onChange={onChange} />
      </div>
      <div>
        number:{" "}
        <input name="numberInput" value={numberValue} onChange={onChange} />
      </div>
      <div>
        <button type="submit" onClick={onClick}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
