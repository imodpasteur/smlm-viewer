/**
 * Copyright 2016-2017 Felix Woitzel. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

self.onmessage = function(e) {
    try {
      console.log('rendering worker is running...')
      const headers = e.data.headers;
      const delimiter = e.data.delimiter;
      const tableDict = e.data.tableDict;
      const format = e.data.format;
      let content = ""
      for(let header of headers){
        content = content + header  + delimiter
      }

      content = content.slice(0, content.length-1) + '\n'
      self.postMessage({progress: 0});
      const rows = tableDict[headers[0]].length
      for(let i=0;i<rows;i++){
        for(let header of headers){
          content = content + tableDict[header][i] + delimiter
        }
        content = content.slice(0, content.length-1) + '\n'
        
        if(i%1000 === 0) self.postMessage({progress: i/rows*100});
      }
      const file = new File([content], e.data.filename + '.'+format, {
        type: "text/plain",
      })
      self.postMessage({finished: true, file});
    } catch (e) {
      console.error(e)
      self.postMessage({error: e, message: 'something went wrong during rendering.', _options:options}, transferables);
    }
}
