import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

// // Create a local cache using localforage for storing fetched files
const fileCache = localforage.createInstance({
	name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetchPlugin',
		setup(build: esbuild.PluginBuild) {
			// Handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`
				};
			});
			// Load modules using this plugin
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				// If the path is 'index.js', return the user's input code
				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: inputCode
					};
				}

				// Check if the file is already cached; if not, fetch it from the CDN
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
				// If the file is cached, return it immediately
				if (cachedResult) {
					return cachedResult;
				}
				// Fetch the file from the specified path using Axios
				const { data, request } = await axios.get(args.path);
				const loader = args.path.match(/.css$/) ? 'css' : 'jsx';
				const result: esbuild.OnLoadResult = {
					loader: loader,
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname
				};
				// Store the response in the cache
				await fileCache.setItem(args.path, result);

				return result;
			});
		}
	};
};

/*
fetchPlugin:
This plugin is responsible for loading modules using esbuild. It fetches and loads module content from external sources, including the CDN and the user's input code.

name: The name of the plugin, which is 'fetchPlugin'.

setup(build): This is the setup function that configures the behavior of the plugin.

build.onResolve({ filter: }, ...): This part of the code handles the resolution of module paths, and it constructs the URL for fetching modules from the CDN.

build.onLoad({ filter:  }, ...): This part handles the actual loading of modules. It checks if the requested file is already cached. If not, it fetches the file from the CDN using Axios. It then stores the fetched content in the local cache (fileCache) and returns it.
*/
