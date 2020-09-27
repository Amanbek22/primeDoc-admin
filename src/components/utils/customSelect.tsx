
export const selectStyles = {
    control: (styles: any) => ({
        ...styles,
        background: "#F8F8F8",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
        borderRadius: "5px",
        width: "100%",
        minHeight: "36px",
        marginTop: "5px",
        fontFamily: 'Balsamiq Sans, cursive',
        fontWeight: 200,
        fontSize: "14px",
        lineHeight: "16px",
        display: "flex",
        alignItems: "center",
        color: "rgba(0, 0, 0, 0.5)"
        // '&:focus':
    }),
    dropdownIndicator: (styles:any) => ({
        ...styles,
        // display: 'none'
    }),
    indicatorSeparator:(styles:any) => ({
        ...styles,
        // display: 'none'
    }),
    option: (styles: any) => {
        return {...styles}
    }
};
