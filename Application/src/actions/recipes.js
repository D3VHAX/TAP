/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}


/**
  * Get Recipes
  */
export function getRecipes() {
  return dispatch => new Promise((resolve) => {
    const recipes = [
      {
        id: 1,
        title: 'This is some sort of Article',
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 1,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5',
        author: 'John Smith',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 2,
        title: 'Dummy text of the printing',
        body: 'Typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-2.jpg?alt=media&token=6ed1740b-529b-4772-9a92-615e92b544b2',
        author: 'Jane Doe',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 3,
        title: 'Survived not only five',
        body: 'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 1,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-3.jpg?alt=media&token=ad0c1913-fd82-48fa-937c-4298875544fa',
        author: 'Jane Doe',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 4,
        title: 'Standard dummy text ever',
        body: 'Has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-4.jpg?alt=media&token=52d5ab1a-98af-42cb-adaf-da04666a7953',
        author: 'John Smith',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 5,
        title: 'Remaining essentially unchanged',
        body: 'Industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5',
        author: 'John Smith',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 6,
        title: 'Only five centuries',
        body: 'Standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-2.jpg?alt=media&token=6ed1740b-529b-4772-9a92-615e92b544b2',
        author: 'John Smith',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 7,
        title: 'But also the leap into',
        body: 'Dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 1,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5',
        author: 'Jane Doe',
        ingredients: [
          'aute irure dolor in',
          'sed do eiusmod tempor incididunt',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 8,
        title: 'Electronic typesetting',
        body: 'Text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5',
        author: 'John Smith',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 9,
        title: 'Essentially unchanged',
        body: 'Industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-2.jpg?alt=media&token=6ed1740b-529b-4772-9a92-615e92b544b2',
        author: 'John Smith',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 10,
        title: 'Standard text',
        body: 'Unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-1.jpg?alt=media&token=9f7c839b-2d40-4660-a2a0-bf6c2f64a2e5',
        author: 'Jane Doe',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 11,
        title: 'But also',
        body: 'Industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-3.jpg?alt=media&token=ad0c1913-fd82-48fa-937c-4298875544fa',
        author: 'John Smith',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
      {
        id: 12,
        title: 'Text But also',
        body: 'Industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        category: 2,
        image: 'https://firebasestorage.googleapis.com/v0/b/react-native-starter-app.appspot.com/o/image-2.jpg?alt=media&token=6ed1740b-529b-4772-9a92-615e92b544b2',
        author: 'John Smith',
        ingredients: [
          'sed do eiusmod tempor incididunt',
          'aute irure dolor in',
          'do eiusmod tempor',
          'uis aute irure dolor in',
          'doloremque laudantium',
          'cupidatat non proident',
        ],
        method: [
          'iste natus error sit voluptatem accusantium doloremque laudantium',
          'magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
          'sed quia non numquam eius modi tempora incidunt ut labore',
        ],
      },
    ];

    return resolve(dispatch({
      type: 'RECIPES_REPLACE',
      data: recipes,
    }));
  });
}
