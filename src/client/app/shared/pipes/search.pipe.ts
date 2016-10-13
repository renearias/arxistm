import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'SearchPipe',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args? :any): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(conversation: any => {
        if (conversation.name) {
          return conversation.name.search(searchText) !== -1 ||
            conversation.lastMessage.search( searchText) !== -1;
        } else {
          if (conversation.text) {
            return conversation.text.search(searchText) !== -1;
          }
        }
      });
    }
  }
}
