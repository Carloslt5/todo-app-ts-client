import { faker } from "@faker-js/faker";

import { API_DEFAULT_LIMIT } from "@/app/api";
import { UserMother } from "@/domains/auth/__mocks__/UserMother";

import { Project } from "../projects.type";

const userData = UserMother.getMockUser();

export class ProjectMother {
  private static currentId = 1;

  static getRandomOrder(project?: Partial<Project>) {
    return {
      id: (this.currentId++).toString(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      ownerId: userData.userId,
      ...project,
    } as Project;
  }

  static getRandomList(length = API_DEFAULT_LIMIT) {
    return Array.from({ length }, () => this.getRandomOrder());
  }
}
