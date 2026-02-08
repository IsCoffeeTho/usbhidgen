import { Parser, Language } from "../../treesitter/web-tree-sitter.js";

export async function init() {
	const lang = await Language.load("./langs/clang/tree-sitter-c.wasm");
	const parser = new Parser();
	parser.setLanguage(lang);
	return {
		name: "clang",
		parser,
		lang,
		query(node, name) {
			const nodeType = node.type;
			console.log(nodeType, name, JSON.stringify(node.text));
			if (nodeType == "primitive_type")
				return "typ";
			if (nodeType == "const" || nodeType == "static")
				return "kywd";
		},
	};
}
