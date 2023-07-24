

export default function NotFound() {

    return (
        <div className="w-full flex flex-col items-center justify-center h-screen text-base-content">
            <img src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt="not found" className="w-56 h-56 mb-4"/>
            <p>
                This page is not available. Sorry about that.<br/>Try searching for something else.
            </p>
        </div>
    )
}