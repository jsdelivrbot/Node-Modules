"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _env = (typeof process == 'object' && process.env) || {};
const _platform = (typeof process == 'object' && process.platform) || '';
const _versions = (typeof process == 'object' && process.versions) || { node: '' };
const _os = (typeof os == 'object' && os) || { release: () => '' };
const streamMap = new WeakMap();
const ciVars = ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'];
function _getColorLevel(stream) {
    if (stream && !stream.isTTY) {
        return 0;
    }
    if (_platform.startsWith('win32')) {
        // Node.js 7.5.0 is the first version of Node.js to include a patch to
        // libuv that enables 256 color output on Windows. Anything earlier and it
        // won't work. However, here we target Node.js 8 at minimum as it is an LTS
        // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
        // release that supports 256 colors.
        const osRelease = _os.release().split('.');
        if (Number(_versions.node.split('.')[0]) >= 8
            && Number(osRelease[0]) >= 10
            && Number(osRelease[2]) >= 10586) {
            return 2;
        }
        return 1;
    }
    if ('CI' in _env) {
        if (ciVars.some(sign => sign in _env) || _env.CI_NAME === 'codeship') {
            return 1;
        }
        return 0;
    }
    if ('TEAMCITY_VERSION' in _env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(_env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if ('TERM_PROGRAM' in _env) {
        const version = parseInt((_env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
        switch (_env.TERM_PROGRAM) {
            case 'iTerm.app':
                return version >= 3 ? 3 : 2;
            case 'Hyper':
                return 3;
            case 'Apple_Terminal':
                return 2;
        }
    }
    if (/-256(color)?$/i.test(_env.TERM)) {
        return 2;
    }
    if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(_env.TERM)) {
        return 1;
    }
    if ('COLORTERM' in _env) {
        return 1;
    }
    if (_env.TERM === 'dumb') {
        return 0;
    }
    return 0;
}
function _getRows() {
    return process.stdout.rows || null;
}
function _getColumns() {
    return process.stdout.columns || null;
}
function _createCapabilities(stream, isTerminalStream) {
    const level = _getColorLevel(stream);
    return {
        readable: stream.readable,
        writable: stream.writable,
        text: true,
        colors: level > 0,
        color256: level > 1,
        color16m: level > 2,
        rows: isTerminalStream ? _getRows() : null,
        columns: isTerminalStream ? _getColumns() : null,
    };
}
function getCapabilities(stream, isTerminalStream = !!stream.isTTY) {
    let maybeCaps = streamMap.get(stream);
    if (!maybeCaps) {
        maybeCaps = _createCapabilities(stream, isTerminalStream);
        streamMap.set(stream, maybeCaps);
    }
    return maybeCaps;
}
exports.getCapabilities = getCapabilities;
exports.stdin = getCapabilities(process.stdin);
exports.stdout = getCapabilities(process.stdout);
exports.stderr = getCapabilities(process.stderr);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fwcy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdGVybWluYWwvY2Fwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQStCQSxNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sT0FBTyxJQUFJLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQy9ELE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxPQUFPLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDekUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLE9BQU8sSUFBSSxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ25GLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBRW5FLE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxFQUEwQixDQUFDO0FBdUN4RCxNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBRy9ELHdCQUF3QixNQUFjO0lBQ3BDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsc0VBQXNFO1FBQ3RFLDBFQUEwRTtRQUMxRSwyRUFBMkU7UUFDM0UsNkVBQTZFO1FBQzdFLG9DQUFvQztRQUNwQyxNQUFN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bnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IFJlYWRhYmxlU3RyZWFtID0gTm9kZUpTLlJlYWRhYmxlU3RyZWFtO1xuaW1wb3J0IFdyaXRlU3RyZWFtID0gTm9kZUpTLldyaXRlU3RyZWFtO1xuaW1wb3J0IFNvY2tldCA9IE5vZGVKUy5Tb2NrZXQ7XG5cblxuLyoqXG4gKiBOb2RlIHNwZWNpZmljIHN0dWZmLlxuICovXG5kZWNsYXJlIGNvbnN0IHByb2Nlc3M6IHtcbiAgZW52OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgcGxhdGZvcm06IHN0cmluZztcbiAgdmVyc2lvbnM6IHtcbiAgICBub2RlOiBzdHJpbmc7XG4gIH07XG5cbiAgc3RkaW46IFJlYWRhYmxlU3RyZWFtO1xuICBzdGRvdXQ6IFdyaXRlU3RyZWFtO1xuICBzdGRlcnI6IFdyaXRlU3RyZWFtO1xufTtcbmRlY2xhcmUgY29uc3Qgb3M6IHtcbiAgcmVsZWFzZTogKCkgPT4gc3RyaW5nO1xufTtcblxuXG5jb25zdCBfZW52ID0gKHR5cGVvZiBwcm9jZXNzID09ICdvYmplY3QnICYmIHByb2Nlc3MuZW52KSB8fCB7fTtcbmNvbnN0IF9wbGF0Zm9ybSA9ICh0eXBlb2YgcHJvY2VzcyA9PSAnb2JqZWN0JyAmJiBwcm9jZXNzLnBsYXRmb3JtKSB8fCAnJztcbmNvbnN0IF92ZXJzaW9ucyA9ICh0eXBlb2YgcHJvY2VzcyA9PSAnb2JqZWN0JyAmJiBwcm9jZXNzLnZlcnNpb25zKSB8fCB7IG5vZGU6ICcnIH07XG5jb25zdCBfb3MgPSAodHlwZW9mIG9zID09ICdvYmplY3QnICYmIG9zKSB8fCB7IHJlbGVhc2U6ICgpID0+ICcnIH07XG5cbmNvbnN0IHN0cmVhbU1hcCA9IG5ldyBXZWFrTWFwPHt9LCBTdHJlYW1DYXBhYmlsaXRpZXM+KCk7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTdHJlYW1DYXBhYmlsaXRpZXMge1xuICByZWFkYWJsZTogYm9vbGVhbjtcbiAgd3JpdGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFN1cHBvcnRzIHRleHQuIFRoaXMgc2hvdWxkIGJlIHRydWUgZm9yIGFueSBzdHJlYW1zLlxuICAgKi9cbiAgdGV4dDogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3VwcG9ydHMgY29sb3JzICgxNiBjb2xvcnMpLlxuICAgKi9cbiAgY29sb3JzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTdXBwb3J0cyAyNTYgY29sb3JzLlxuICAgKi9cbiAgY29sb3IyNTY6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFN1cHBvcnRzIDE2IG1pbGxpb25zICgzeDgtYml0IGNoYW5uZWxzKSBjb2xvcnMuXG4gICAqL1xuICBjb2xvcjE2bTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIHRoZSB0ZXJtaW5hbC4gSWYgdGhlIHN0cmVhbSBpcyBub3QgdGllZCB0byBhIHRlcm1pbmFsLCB3aWxsIGJlIG51bGwuXG4gICAqL1xuICByb3dzOiBudW1iZXIgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgdGVybWluYWwuIElmIHRoZSBzdHJlYW0gaXMgbm90IHRpZWQgdG8gYSB0ZXJtaW5hbCwgd2lsbCBiZSBudWxsLlxuICAgKi9cbiAgY29sdW1uczogbnVtYmVyIHwgbnVsbDtcbn1cblxuXG5jb25zdCBjaVZhcnMgPSBbJ1RSQVZJUycsICdDSVJDTEVDSScsICdBUFBWRVlPUicsICdHSVRMQUJfQ0knXTtcblxuXG5mdW5jdGlvbiBfZ2V0Q29sb3JMZXZlbChzdHJlYW06IFNvY2tldCk6IG51bWJlciB7XG4gIGlmIChzdHJlYW0gJiYgIXN0cmVhbS5pc1RUWSkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYgKF9wbGF0Zm9ybS5zdGFydHNXaXRoKCd3aW4zMicpKSB7XG4gICAgLy8gTm9kZS5qcyA3LjUuMCBpcyB0aGUgZmlyc3QgdmVyc2lvbiBvZiBOb2RlLmpzIHRvIGluY2x1ZGUgYSBwYXRjaCB0b1xuICAgIC8vIGxpYnV2IHRoYXQgZW5hYmxlcyAyNTYgY29sb3Igb3V0cHV0IG9uIFdpbmRvd3MuIEFueXRoaW5nIGVhcmxpZXIgYW5kIGl0XG4gICAgLy8gd29uJ3Qgd29yay4gSG93ZXZlciwgaGVyZSB3ZSB0YXJnZXQgTm9kZS5qcyA4IGF0IG1pbmltdW0gYXMgaXQgaXMgYW4gTFRTXG4gICAgLy8gcmVsZWFzZSwgYW5kIE5vZGUuanMgNyBpcyBub3QuIFdpbmRvd3MgMTAgYnVpbGQgMTA1ODYgaXMgdGhlIGZpcnN0IFdpbmRvd3NcbiAgICAvLyByZWxlYXNlIHRoYXQgc3VwcG9ydHMgMjU2IGNvbG9ycy5cbiAgICBjb25zdCBvc1JlbGVhc2UgPSBfb3MucmVsZWFzZSgpLnNwbGl0KCcuJyk7XG4gICAgaWYgKE51bWJlcihfdmVyc2lvbnMubm9kZS5zcGxpdCgnLicpWzBdKSA+PSA4XG4gICAgICAgICYmIE51bWJlcihvc1JlbGVhc2VbMF0pID49IDEwXG4gICAgICAgICYmIE51bWJlcihvc1JlbGVhc2VbMl0pID49IDEwNTg2KSB7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG5cbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmICgnQ0knIGluIF9lbnYpIHtcbiAgICBpZiAoY2lWYXJzLnNvbWUoc2lnbiA9PiBzaWduIGluIF9lbnYpIHx8IF9lbnYuQ0lfTkFNRSA9PT0gJ2NvZGVzaGlwJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAoJ1RFQU1DSVRZX1ZFUlNJT04nIGluIF9lbnYpIHtcbiAgICByZXR1cm4gL14oOVxcLigwKlsxLTldXFxkKilcXC58XFxkezIsfVxcLikvLnRlc3QoX2Vudi5URUFNQ0lUWV9WRVJTSU9OKSA/IDEgOiAwO1xuICB9XG5cbiAgaWYgKCdURVJNX1BST0dSQU0nIGluIF9lbnYpIHtcbiAgICBjb25zdCB2ZXJzaW9uID0gcGFyc2VJbnQoKF9lbnYuVEVSTV9QUk9HUkFNX1ZFUlNJT04gfHwgJycpLnNwbGl0KCcuJylbMF0sIDEwKTtcblxuICAgIHN3aXRjaCAoX2Vudi5URVJNX1BST0dSQU0pIHtcbiAgICAgIGNhc2UgJ2lUZXJtLmFwcCc6XG4gICAgICAgIHJldHVybiB2ZXJzaW9uID49IDMgPyAzIDogMjtcbiAgICAgIGNhc2UgJ0h5cGVyJzpcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgICBjYXNlICdBcHBsZV9UZXJtaW5hbCc6XG4gICAgICAgIHJldHVybiAyO1xuXG4gICAgICAvLyBObyBkZWZhdWx0XG4gICAgfVxuICB9XG5cbiAgaWYgKC8tMjU2KGNvbG9yKT8kL2kudGVzdChfZW52LlRFUk0pKSB7XG4gICAgcmV0dXJuIDI7XG4gIH1cblxuICBpZiAoL15zY3JlZW58Xnh0ZXJtfF52dDEwMHxecnh2dHxjb2xvcnxhbnNpfGN5Z3dpbnxsaW51eC9pLnRlc3QoX2Vudi5URVJNKSkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgaWYgKCdDT0xPUlRFUk0nIGluIF9lbnYpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmIChfZW52LlRFUk0gPT09ICdkdW1iJykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cblxuZnVuY3Rpb24gX2dldFJvd3MoKSB7XG4gIHJldHVybiBwcm9jZXNzLnN0ZG91dC5yb3dzIHx8IG51bGw7XG59XG5mdW5jdGlvbiBfZ2V0Q29sdW1ucygpIHtcbiAgcmV0dXJuIHByb2Nlc3Muc3Rkb3V0LmNvbHVtbnMgfHwgbnVsbDtcbn1cblxuXG5mdW5jdGlvbiBfY3JlYXRlQ2FwYWJpbGl0aWVzKHN0cmVhbTogU29ja2V0LCBpc1Rlcm1pbmFsU3RyZWFtOiBib29sZWFuKTogU3RyZWFtQ2FwYWJpbGl0aWVzIHtcbiAgY29uc3QgbGV2ZWwgPSBfZ2V0Q29sb3JMZXZlbChzdHJlYW0pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZGFibGU6IHN0cmVhbS5yZWFkYWJsZSxcbiAgICB3cml0YWJsZTogc3RyZWFtLndyaXRhYmxlLFxuICAgIHRleHQ6IHRydWUsXG5cbiAgICBjb2xvcnM6IGxldmVsID4gMCxcbiAgICBjb2xvcjI1NjogbGV2ZWwgPiAxLFxuICAgIGNvbG9yMTZtOiBsZXZlbCA+IDIsXG5cbiAgICByb3dzOiBpc1Rlcm1pbmFsU3RyZWFtID8gX2dldFJvd3MoKSA6IG51bGwsXG4gICAgY29sdW1uczogaXNUZXJtaW5hbFN0cmVhbSA/IF9nZXRDb2x1bW5zKCkgOiBudWxsLFxuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXBhYmlsaXRpZXMoXG4gIHN0cmVhbTogU29ja2V0LFxuICBpc1Rlcm1pbmFsU3RyZWFtID0gISFzdHJlYW0uaXNUVFksXG4pOiBTdHJlYW1DYXBhYmlsaXRpZXMge1xuICBsZXQgbWF5YmVDYXBzID0gc3RyZWFtTWFwLmdldChzdHJlYW0pO1xuICBpZiAoIW1heWJlQ2Fwcykge1xuICAgIG1heWJlQ2FwcyA9IF9jcmVhdGVDYXBhYmlsaXRpZXMoc3RyZWFtLCBpc1Rlcm1pbmFsU3RyZWFtKTtcbiAgICBzdHJlYW1NYXAuc2V0KHN0cmVhbSwgbWF5YmVDYXBzKTtcbiAgfVxuXG4gIHJldHVybiBtYXliZUNhcHM7XG59XG5cblxuZXhwb3J0IGNvbnN0IHN0ZGluID0gZ2V0Q2FwYWJpbGl0aWVzKHByb2Nlc3Muc3RkaW4gYXMgU29ja2V0KTtcbmV4cG9ydCBjb25zdCBzdGRvdXQgPSBnZXRDYXBhYmlsaXRpZXMocHJvY2Vzcy5zdGRvdXQpO1xuZXhwb3J0IGNvbnN0IHN0ZGVyciA9IGdldENhcGFiaWxpdGllcyhwcm9jZXNzLnN0ZGVycik7XG4iXX0=