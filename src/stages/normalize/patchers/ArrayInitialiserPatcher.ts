import { PatcherContext } from '../../../patchers/types';
import normalizeListItem from '../../../utils/normalizeListItem';
import NodePatcher from './../../../patchers/NodePatcher';

export default class ArrayInitialiserPatcher extends NodePatcher {
  members: Array<NodePatcher>;

  constructor(patcherContext: PatcherContext, members: Array<NodePatcher>) {
    super(patcherContext);
    this.members = members;
  }

  patchAsExpression(): void {
    for (let [i, member] of this.members.entries()) {
      member.patch();
      normalizeListItem(this, member, this.members[i + 1]);
    }
  }
}
