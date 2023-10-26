import * as esbuild from 'esbuild-wasm';

// Define a custom esbuild plugin called "unpkgPathPlugin"
export const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			// handle root file entry of index.js
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return {
					path: 'index.js',
					namespace: 'a'
				};
			});

			// Handle relative paths in a module
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
				};
			});
			// Handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`
				};
			});
		}
	};
};

/*
unpkgPathPlugin is a function that returns an esbuild plugin.
unpkgPathPlugin:
This plugin handles resolving and loading module paths for JavaScript code entered by the user. It intercepts and modifies the behavior of esbuild's resolution and loading functions.

name: The name of the plugin, which is 'unpkg-path-plugin'.

setup(build): This is a setup function that configures the behavior of the plugin. It defines how esbuild should resolve and load module paths.

build.onResolve({ filter: /(^index\.js$)/ }, ...): This part of the code handles the root file entry of 'index.js'. It returns an object specifying the path as 'index.js' and the namespace as 'a'.

build.onResolve({ filter: /^\.+\// }, ...): This part handles relative paths in a module. It constructs the correct URL for the unpkg.com CDN based on the provided arguments.

build.onResolve({ filter: ...  }, ...: This part handles the main file of a module and constructs the URL for the CDN.
*/
