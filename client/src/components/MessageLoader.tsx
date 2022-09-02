import ContentLoader from 'react-content-loader'

const MessageLoader = (props: any) => {
    return (
        <div className="w-full h-full max-h-25rem">
            <div className="hidden md:flex">
                <ContentLoader
                    speed={2}
                    width="100%"
                    viewBox="0 0 1000 500"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...props}
                >
                    <circle className="min-w-10rem" cx="40" cy="50" r="30" />
                    <rect x="90" y="23" rx="8" ry="8" width="300" height="60" />

                    <circle cx="960" cy="140" r="30" />
                    <rect
                        x="610"
                        y="110"
                        rx="8"
                        ry="8"
                        width="300"
                        height="60"
                    />
                </ContentLoader>
            </div>

            <div className="flex md:hidden">
                <ContentLoader
                    speed={2}
                    width="100%"
                    viewBox="0 0 1000 500"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...props}
                >
                    <circle className="min-w-10rem" cx="50" cy="50" r="50" />
                    <rect
                        x="120"
                        y="23"
                        rx="8"
                        ry="8"
                        width="400"
                        height="100"
                    />

                    <circle cx="960" cy="140" r="30" />
                    <rect
                        x="610"
                        y="110"
                        rx="8"
                        ry="8"
                        width="300"
                        height="60"
                    />
                </ContentLoader>
            </div>
        </div>
    )
}

export default MessageLoader
