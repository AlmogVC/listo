import * as vscode from 'vscode';
import { Wrapper } from './wrapper.type';
import { getFormattedText } from './format-text';

export function activate(context: vscode.ExtensionContext) {

	console.log('"listo" extension active');

	const disposable1 = vscode.commands.registerCommand('listo.circleWrapMultiLine', () => wrapText({ listStart: '(', listEnd: ')', itemStart: '"', itemEnd: '"', itemJoin: ',', newLine: true }));
	const disposable2 = vscode.commands.registerCommand('listo.circleWrapSingleLine', () => wrapText({ listStart: '(', listEnd: ')', itemStart: '"', itemEnd: '"', itemJoin: ',', newLine: false }));

	const disposable3 = vscode.commands.registerCommand('listo.squareWrapMultiLine', () => wrapText({ listStart: '[', listEnd: ']', itemStart: '"', itemEnd: '"', itemJoin: ',', newLine: true }));
	const disposable4 = vscode.commands.registerCommand('listo.squareWrapSingleLine', () => wrapText({ listStart: '[', listEnd: ']', itemStart: '"', itemEnd: '"', itemJoin: ',', newLine: false }));

	const disposable5 = vscode.commands.registerCommand('listo.customWrap', () => getCustomWrap().then(wrapText));

	context.subscriptions.push(disposable1, disposable2, disposable3, disposable4, disposable5);
}


async function getCustomWrap(): Promise<Wrapper> {
	const listStart = await vscode.window.showInputBox({
		prompt: "Enter list start wrapper",
		placeHolder: "Type something...",
		value: ''
	});
	const listEnd = await vscode.window.showInputBox({
		prompt: "Enter list end wrapper",
		placeHolder: "Type something...",
		value: ''
	});
	const itemStart = await vscode.window.showInputBox({
		prompt: "Enter item start wrapper",
		placeHolder: "Type something...",
		value: ''

	});
	const itemEnd = await vscode.window.showInputBox({
		prompt: "Enter item end wrapper",
		placeHolder: "Type something...",
		value: ''
	});
	const itemJoin = await vscode.window.showInputBox({
		prompt: "Enter item join character",
		placeHolder: "Type something...",
		value: ''
	});

	const addNewLine = await vscode.window.showQuickPick(['Yes', 'No'], {
		placeHolder: 'Add new line?',
		canPickMany: false,
		title: "Add new line?",
	});

	return {
		itemEnd: itemEnd || '',
		itemStart: itemStart || '',
		listStart: listStart || '',
		listEnd: listEnd || '',
		itemJoin: itemJoin || '',
		newLine: addNewLine === 'Yes'
	};
}

function wrapText(wrapper: Wrapper) {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage('no active editor');
		return;
	}

	const selection = editor.selection;

	const document = editor.document;
	const eofChar = document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';

	const fullRange = new vscode.Range(
		selection.start,
		selection.end
	);
	const text = document.getText(fullRange);

	if (!text) {
		vscode.window.showInformationMessage('No text to wrap');
		return;
	}

	editor.edit((builder) => {
		builder.replace(fullRange, getFormattedText(text, wrapper, eofChar));
	});

	vscode.window.showInformationMessage('Text Wrapped!');
}

export function deactivate() { }
