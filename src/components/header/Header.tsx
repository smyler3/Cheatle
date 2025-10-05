import "./header.css"

const Header = () => {
    return (
        <header
            className="header"
        >
            <div
                className="header-content-container"
            >
                <h1
                    className="title"
                >
                    Cheatle
                </h1>
                <button
                    className="button"
                >
                    <img
                        src="/infoIcon"
                        alt=""
                        className="icon"
                    />
                </button>
            </div>
        </header>
    )
};

export default Header;