export default () => {
    return {
        files: [
            "tests/*.ava.*"
        ],
        typescript: {
            rewritePaths: {
                "src/": "dist/"
            }
        },
        require: [
            "ts-node/register"
		]
    };
};
