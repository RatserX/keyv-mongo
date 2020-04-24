export default () => {
    return {
        files: [
            "tests/*.ava.*"
        ],
        require: [
            "ts-node/register"
        ],
        typescript: {
            rewritePaths: {
                "src/": "dist/"
            }
        }
    };
};
