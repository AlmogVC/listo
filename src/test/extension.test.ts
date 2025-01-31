import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', async () => {
	vscode.window.showInformationMessage('Start all tests.');
	const originalText = `a\nb\nc\nd\ne\nf\ng`;

	const getExpectedResult = (eof: string) => {
		return {
			'listo.parenthesesMultiLine': `(${eof}"a",${eof}"b",${eof}"c",${eof}"d",${eof}"e",${eof}"f",${eof}"g"${eof})`,
			'listo.parenthesesSingleLine': `("a","b","c","d","e","f","g")`,
			'listo.squareBracketsMultiLine': `[${eof}"a",${eof}"b",${eof}"c",${eof}"d",${eof}"e",${eof}"f",${eof}"g"${eof}]`,
			'listo.squareBracketsSingleLine': `["a","b","c","d","e","f","g"]`,
			'listo.angleBracketsMultiLineWrapper': `<${eof}"a",${eof}"b",${eof}"c",${eof}"d",${eof}"e",${eof}"f",${eof}"g"${eof}>`,
			'listo.angleBracketsSingleLineWrapper': `<"a","b","c","d","e","f","g">`,
			'listo.curlyBracketsMultiLineWrapper': `{${eof}"a",${eof}"b",${eof}"c",${eof}"d",${eof}"e",${eof}"f",${eof}"g"${eof}}`,
			'listo.curlyBracketsSingleLineWrapper': `{"a","b","c","d","e","f","g"}`,
			'listo.jsonMultiLineWrapper': `{${eof}"a":"",${eof}"b":"",${eof}"c":"",${eof}"d":"",${eof}"e":"",${eof}"f":"",${eof}"g":""${eof}}`,
			'listo.jsonSingleLineWrapper': `{"a":"","b":"","c":"","d":"","e":"","f":"","g":""}`,
		};
	};

	for (const [command, result] of Object.entries(getExpectedResult('\n'))) {
		test(command, async () => {
			const document = await vscode.workspace.openTextDocument({ content: originalText });
			const editor = await vscode.window.showTextDocument(document);
			editor.selection = new vscode.Selection(0, 0, document.lineCount, 0);
			const eof = document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
			await vscode.commands.executeCommand(command);

			// Wait for the text update (next event loop tick) - command will affect document on next tick
			await new Promise(resolve => setTimeout(resolve, 50));
			const newText = document.getText();
			assert.strictEqual(newText, result);
		});
	}
});
