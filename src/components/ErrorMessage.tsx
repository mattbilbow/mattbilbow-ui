interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorMessage = ({ message = "Something went wrong", onRetry }: ErrorMessageProps) => {
    return (
        <div className="text-center py-12">
            <p className="text-red-600 mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                >
                    Try again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;