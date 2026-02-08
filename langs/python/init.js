import { Parser, Language, Query } from "../../treesitter/web-tree-sitter.js";

export async function init() {
	const lang = await Language.load("./langs/python/tree-sitter-python.wasm");
	const parser = new Parser();
	parser.setLanguage(lang);
	return {
		name: "python",
		parser,
		lang,
		query(node, name) {
			console.log(node.type, name);
			const nodeType = node.type;
			if (nodeType == "comment")
				return "cmt"
			if (nodeType == "import")
				return "kywd";
			if (nodeType == "integer")
				return "nbr";
			if (nodeType == "identifier") {
				if (name == "function")
					return "typ"
				if (name == "attribute")
					return
				return "idn"
			}
			if (nodeType == "attribute") {
				if (name == "function")
					return "fn"
				return "idn"
			}
		}
	};
}
