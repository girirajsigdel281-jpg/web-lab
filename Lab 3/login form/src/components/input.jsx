function MyInput({label, type, placeholder, value, onChange}){
    const handleChange = (e) => {
        console.log("Input typed:", e.target.value);
        if (onChange) {
            onChange(e);
        }
    }

    return(
        <div className="input-wrapper">
          <label className="input-label">{label}</label>
          <input 
            className='input' 
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange={handleChange}
          />
        </div>
    );
}

export default MyInput;
