import { Parser, Language, Query } from "../../treesitter/web-tree-sitter.js";

export async function init() {
	const lang = await Language.load(`./langs/json/tree-sitter-json.wasm`);
	const parser = new Parser();
	parser.setLanguage(lang);
	return {
		name: "json",
		parser,
		lang,
		query(node, name) { 
			if (name == "key")
				return "idn";
			const nodeType = node.type;
			if (nodeType == "string")
				return "str";
			if (nodeType == "number")
				return "nbr";
			if (nodeType == "true" || nodeType == "false")
				return "bool";
		}
	};
}
