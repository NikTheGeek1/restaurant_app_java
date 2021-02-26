import './HerokuFallback.css';

const HerokuFallback = () => {

    return (
        <main className="heroku-page-container">
            <div className="heroku-loading-spin">
                <h1 className="heroku-fallback-msg">Please wait until heroku warms up...</h1>
                <div className="lds-circle"><div></div></div>
            </div>
        </main>
    );
};

export default HerokuFallback;